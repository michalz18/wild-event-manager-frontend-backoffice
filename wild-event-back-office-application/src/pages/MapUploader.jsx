import { DashboardComponent } from "../components/dashboard/DashboardComponent"
import { HeaderComponent } from "../components/header/HeaderComponent"
import { MapConfig } from "../components/mapConfig/MapConfig"

export const MapUploader = () =>{
  return(
    <>
    <HeaderComponent />
    <DashboardComponent />
    <MapConfig/>
    </>
  )
}