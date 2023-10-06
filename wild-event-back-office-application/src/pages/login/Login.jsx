import { ResponsiveLayout } from "../layout/ResponsiveLayout"
import { LoginDesktop } from "./LoginDesktop"
import { LoginPhone } from "./LoginPhone"

export const Login = () => {
  return (
    <ResponsiveLayout 
    desktopComponent={<LoginDesktop />}
    phoneComponent={<LoginPhone />}
    />
    
  )
}