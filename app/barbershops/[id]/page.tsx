//server componentes (next)

import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import BarbershopInfo from "./components/barbershop-info";
import ServiceItem from "./components/service-item";

//interface recebe parametros
interface BarbershopDetailsPageProps {
    params: any;
    //opcional pq n se sabe se o usuario vai procurar por um id
    id?: string;
}

// aonde vai ser mostrado os paramentos
const BarbershopDetailsPage = async ({params}: BarbershopDetailsPageProps) => {
    if (!params.id) {
        //TODO: SE N TIVEr ID redirecionar para home page
        return null
    }

//basicamento aqui são as querys
const barbershop = await db.barbershop.findUnique({
    where:{
        id: params.id,
    },
    include: {
        services: true
    }
}); 

    if (!barbershop){
      //TODO: //se n houver barbearia direcionar para home page
      return null;
    }

    
    return (
      <div>
        <BarbershopInfo barbershop={barbershop} />

        <div className="px-5 flex flex-col gap-4 py-6">
          {barbershop.services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>
    );
};



export default BarbershopDetailsPage;