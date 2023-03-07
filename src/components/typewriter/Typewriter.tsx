import { useEffect, useState } from "preact/hooks";
import TypingEffect from "./TypingEffect";

interface TypingEffectsProps {
	textArray: string[];
	speed: number;
	size: number;
	wait: number;
}

function TypingEffects({ textArray = ["Hello"], speed = 200, wait = 1000, size = 50 }: TypingEffectsProps) {
	const [finishFlag, setFinishFlag] = useState(false);
	const [index, setIndex] = useState(0);

	const handleFinish = () => {
		setFinishFlag(true);
	};

	useEffect(() => {
		if (finishFlag) {
			if (index < textArray.length - 1) {
				setIndex(index + 1);
				setFinishFlag(false);
			} else if (index === textArray.length - 1) {
				setIndex(0);
				setFinishFlag(false);
			}
		}
	}, [finishFlag, index, textArray.length]);
	return (
		<TypingEffect
			wait={wait}
			text={textArray[index]}
			speed={speed}
			size={size}
			handleFinish={handleFinish}
		/>
	);
}

export default TypingEffects;
