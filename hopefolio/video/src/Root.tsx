import { Composition, Still } from "remotion";
import { PortfolioFilm, PortfolioFilmCover } from "./PortfolioFilm";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="PortfolioSocial"
        component={PortfolioFilm}
        durationInFrames={840}
        fps={30}
        width={1080}
        height={1920}
      />
      <Still
        id="PortfolioSocialCover"
        component={PortfolioFilmCover}
        width={1080}
        height={1920}
      />
    </>
  );
};
