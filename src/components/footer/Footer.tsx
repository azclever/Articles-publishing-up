import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div 
     style={{height: '50px'}} 
     className='flex items-center justify-between text-cyan-700 bg-neutral-200 px-12'
    >

      <p>Abdalrhman</p>
      <p>Copyright</p>
      <div className="flex w-12 justify-between">
        <a href="" className=""> <FaGithub /></a>
        <a href="" className=""> <FaLinkedin /></a>

      </div>
    </div>
  )
}

export default Footer
// rgb(227, 225, 225)

// rgb(15, 168, 176)