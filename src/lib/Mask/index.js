import styled from 'styled-components';

const Mask = styled('div')({
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 1000,
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

export default Mask;
