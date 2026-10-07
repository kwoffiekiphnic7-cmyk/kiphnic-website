import Link from "next/link";

export type ServiceItem = {
  icon: string;
  title: string;
  body: string;
  id?: string;
  features?: string[];
};

export default function ServiceCard({ service }: { service: ServiceItem }) {
  const href = service.id ? `/services#${service.id}` : "/services";
  return (
    <article className="card" id={service.id}>
      <div className="icon">{service.icon}</div>
      <h3>{service.title}</h3>
      <p>{service.body}</p>
      {service.features ? (
        <ul className="features">
          {service.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      ) : null}
      <Link className="card-link" href={href}>
        Learn More →
      </Link>
    </article>
  );
}
