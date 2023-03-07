import Tilt from "react-parallax-tilt";

const BigHero = () => {
	return (
		<div className="relative">
			<div className="flex absolute inset-0 flex-col" aria-hidden="true">
				<div className="flex-1" />
				<div className="flex-1 w-full bg-slate-800" />
			</div>
			<div className="relative px-4 mx-auto max-w-7xl sm:px-6">
				{/* @ts-ignore */}
				<Tilt tiltMaxAngleX={0.2} tiltMaxAngleY={0.2}>
					<img
						className="rounded-lg shadow-lg duration-150"
						src={"/static/banner.webp"}
						alt="VSCode screenshot"
					/>
				</Tilt>
			</div>
			{/* Margin */}

			<div className="py-4 bg-slate-800 sm:py-12"></div>
		</div>
	);
};

export default BigHero;