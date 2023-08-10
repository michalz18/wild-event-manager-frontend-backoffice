import { DashboardComponent } from "../components/dashboard/DashboardComponent"
import { HeaderComponent } from "../components/header/HeaderComponent"
import { WelcomeWindow } from "../components/welcomeWindow/WelcomeComponent"

export const MainPage = () =>{
  return(
    <>
    <HeaderComponent />
    <DashboardComponent />
    <WelcomeWindow />
    </>
  )
}