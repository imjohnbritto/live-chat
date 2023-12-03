import { COLORS, DEVICE } from "@utils/theme";
import { styled } from "@mui/system";
import Typography from "../Typography";
import Router from "next/router";

type FooterProps = {
  bgColor: string;
};

const FooterWrapper = styled("footer")<FooterProps>`
  border-top: 1px solid ${COLORS.LIGHT_GREY};
  text-align: center;
  padding: 24px;
  background-color: ${({ bgColor }) => bgColor};
  bottom: 0;
  @media (max-width: ${DEVICE.MOBILE}) {
    display: none;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper bgColor={COLORS.LIGHT_GREY}>
      <Typography size={12} color={"TEXT3"} weight={"400"}>
        Teams Chat © {currentYear}, All right reserved
      </Typography>
    </FooterWrapper>
  );
};
export default Footer;
