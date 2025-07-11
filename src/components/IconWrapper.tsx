import React, { SVGProps, FunctionComponent } from "react";

interface IconWrapperProps {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  className?: string;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ icon: Icon, className }) => {
  return <Icon className={className} />;
};

export default IconWrapper;
