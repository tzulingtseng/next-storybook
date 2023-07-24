import { createGlobalStyle } from 'styled-components';
import breakpoint from '@/lib/constant/breakpoint';

const GlobalStyle = createGlobalStyle`
    
    html {
        font-size: 12px;
    }
    // 360px
    ${breakpoint.mediaXS} {
        html {
            font-size: 14px;
        }
    }
    // 480px
    ${breakpoint.mediaSM} {
        html {
            font-size: 14px;
        }
    }
    // 768px
    ${breakpoint.mediaMD} {
        html {
            font-size: 16px;
        }
    }
    // 992px
    ${breakpoint.mediaLG} {
        html {
            font-size:16px;
        }
    }
    // 1280px
    ${breakpoint.media1XL} {
        html {
            font-size:16px;
        }
    }
`;
export default GlobalStyle;
