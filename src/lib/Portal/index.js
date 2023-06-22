import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children, customRootId }) => {
    useEffect(() => {
        let portalRoot;
        const rootId = customRootId || 'portal-root';

        if (typeof window !== 'undefined') {
            portalRoot = document.getElementById(rootId);

            if (!portalRoot) {
                portalRoot = document.createElement('div');
                portalRoot.id = rootId;
                document.body.appendChild(portalRoot);
            }

            return () => {
                portalRoot.parentElement.removeChild(portalRoot);
            };
        }
    }, [customRootId]);

    return typeof window !== 'undefined' && customRootId
        ? ReactDOM.createPortal(children, document.getElementById(customRootId))
        : null;
};

export default Portal;
