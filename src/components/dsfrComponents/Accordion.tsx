import { PropsWithChildren } from 'react';

export interface AccordionProps {
  title: React.ReactNode;
  id: string;
}

export const Accordion: React.FC<PropsWithChildren<AccordionProps>> = ({ title, children, id }) => {
  return (
    <section className="fr-accordion">
      <h3 className="fr-accordion__title">
        <button className="fr-accordion__btn" aria-expanded="false" aria-controls={id}>
          {title}
        </button>
      </h3>
      <div className="fr-collapse" id={id}>
        {children}
      </div>
    </section>
  );
};

export interface AccordionGroupProps {
  className?: string;
}

export const AccordionGroup: React.FC<PropsWithChildren<AccordionGroupProps>> = ({
  children,
  className
}) => {
  return <div className={`fr-accordions-group ${className}`}>{children}</div>;
};

export default Accordion;
