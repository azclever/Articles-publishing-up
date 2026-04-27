import { NextRequest, NextResponse } from 'next/server';

/**
 *  @method  GET
 *  @route   ~/api/users/logout
 *  @desc    Logout User
 *  @access  public
 */
export function GET(request: NextRequest) {
    try {
        const response = NextResponse.json(
            { message: 'logout' },
            { status: 200 }
        );

        response.cookies.delete("jwtToken");

        return response;
    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        );
    }
}