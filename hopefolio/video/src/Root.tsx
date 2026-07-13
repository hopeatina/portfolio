import { Composition, Still } from "remotion";
import { FramedPortfolioFilm, PortfolioFilm, PortfolioFilmCover } from "./PortfolioFilm";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="PortfolioSocial"
        component={PortfolioFilm}
        durationInFrames={879}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PortfolioSocialSquare"
        component={FramedPortfolioFilm}
        durationInFrames={879}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="PortfolioSocialLandscape"
        component={FramedPortfolioFilm}
        durationInFrames={879}
        fps={30}
        width={1920}
        height={1080}
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
