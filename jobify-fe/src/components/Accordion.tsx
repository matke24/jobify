import React, { PropsWithChildren, useRef, useState } from "react";
import Wrapper from "../assets/wrappers/Accordion";
import { FaChevronDown } from "react-icons/fa";

const Accordion: React.FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const rotateStyle = {
    transform: isOpen ? "rotate(180deg)" : "",
    transition: "transform 700ms ease",
  };

  return (
    <Wrapper>
      <div
        className="accordion-header"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <h5 className="accordion-header-title">Search</h5>
        <div>
          <FaChevronDown style={rotateStyle} />
        </div>
      </div>
      <div
        className="accordion-children"
        style={{ maxHeight: isOpen ? `${ref.current?.scrollHeight}px` : "0px" }}
        ref={ref}
      >
        {children}
      </div>
    </Wrapper>
  );
};

export default Accordion;
