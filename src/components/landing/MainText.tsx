import TypingEffects from "../typewriter/Typewriter";

const MainText = () => {
	return (
		<div className="relative pb-16 sm:pb-24">
			<div className="px-4 mx-auto mt-16 max-w-7xl ssm:mt-12 sm:px-6 font-inter">
				<div className="text-left">
					<h1 className="text-4xl font-black text-gray-900 dark:text-gray-300 sm:text-5xl md:text-6xl">
						<span className="block">Hey,</span>
						<span className="block pb-2 text-transparent bg-clip-text bg-gradient-to-tl from-fuchsia-500 via-red-600 to-orange-400">
							I&apos;m{" "}
							<TypingEffects
								textArray={["CPlusPatch", "a developer", "a Linux user", "a FOSS supporter"]}
								speed={100}
								wait={1500}
								size={50}
							/>
						</span>
					</h1>
				</div>
			</div>
		</div>
	);
};

export default MainText;