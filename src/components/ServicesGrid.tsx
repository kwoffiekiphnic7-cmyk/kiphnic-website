import { services } from "@/data/services";
import ServiceCard from "@/components/sections/ServiceCard";

export default function ServicesGrid() {
  return (
    <div className="cards">
      {services.map((s) => (
        <ServiceCard key={s.title} service={s} />
      ))}
    </div>
  );
}

