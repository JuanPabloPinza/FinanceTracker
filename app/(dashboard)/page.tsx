import { Button } from "@/components/ui/button";
import {SignOutButton, UserButton} from "@clerk/nextjs"

export default function Home() {
return(
  <>
<Button className="bg-red-600"><SignOutButton>Cerrar Sesión</SignOutButton></Button>
<UserButton></UserButton>
  </>
)

}