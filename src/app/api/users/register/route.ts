import { RegisterUserDto } from '@/utils/dtos';
import { registerSchema } from '@/utils/validationSchemas';
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/utils/db';
import bcrypt from 'bcryptjs';
import { setCookie } from '@/utils/generateToken';

/**
 *  @method  POST
 *  @route   ~/api/users/register
 *  @desc    Create New User [(Register) (Sign Up) ]
 *  @access  public
 */


export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as RegisterUserDto;
        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 })
        }

        const user = await prisma.user.findUnique({ where: { email: body.email } });
        if (user) {
            return NextResponse.json(
                { message: 'this user already registered' },
                { status: 400 }
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        const newUser = await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: hashedPassword,
            },
            select: {
                username: true,
                id: true,
                isAdmin: true,
            }
        });


        const cookie = setCookie({
            id: newUser.id,
            username: newUser.username,
            isAdmin: newUser.isAdmin,
        });

        return NextResponse.json(
            { ...newUser, message: "Registered & Authenticated" },
            {
                status: 201,
                headers: { "Set-Cookie": cookie }
            });

    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        );
    }
}



// export async function POST(request: NextRequest) {
//     try {
//         const body = await request.json();
//         const validation = registerSchema.safeParse(body);

//         console.log(body);
//         if (!validation.success) {
//             return NextResponse.json(
//                 { message: validation.error.issues[0].message },
//                 { status: 400 }
//             );
//         }

//         const data = validation.data;

//         const salt = await bcrypt.genSalt(12);
//         const hashedPassword = await bcrypt.hash(data.password, salt);

//         let newUser;

//         try {
//             newUser = await prisma.user.create({
//                 data: {
//                     username: data.username,
//                     email: data.email,
//                     password: hashedPassword,
//                 },
//                 select: {
//                     username: true,
//                     id: true,
//                     isAdmin: true,
//                 }
//             });
//         } catch (err: any) {
//             if (err.code === 'P2002') {
//                 return NextResponse.json(
//                     { message: 'this user already registered' },
//                     { status: 400 }
//                 );
//             }
//             throw err;
//         }

//         const cookie = setCookie({
//             id: newUser.id,
//             username: newUser.username,
//             isAdmin: newUser.isAdmin,
//         });

//         return NextResponse.json(
//             { user: newUser, message: "Registered & Authenticated" },
//             {
//                 status: 201,
//                 headers: { "Set-Cookie": cookie }
//             }
//         );

//     } catch (error) {
//         console.error(error);
//         return NextResponse.json(
//             { message: 'internal server error' },
//             { status: 500 }
//         );
//     }
// }