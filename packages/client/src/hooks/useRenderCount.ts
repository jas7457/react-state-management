import { useRef } from 'react';

export default function useRenderCount() {
	const renderCountRef = useRef(0);
	renderCountRef.current++;
	return renderCountRef.current;
}
