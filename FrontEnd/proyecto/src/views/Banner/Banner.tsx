import * as S from './Banner.style';

export const Banner: React.FC = () => {
    return(
        <S.BannerWrapper>
            <h1>¡Bienvenido a la página de inicio!</h1>
            <p>Esta es la página de inicio de la aplicación.</p>
        </S.BannerWrapper>
    );
}