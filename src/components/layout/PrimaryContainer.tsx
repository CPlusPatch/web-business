const PrimaryContainer = ({
	size = "7xl",
	children,
	id = "",
	className = "",
}: {
	size?: "7xl" | "6xl" | "5xl" | "4xl" | "3xl" | "2xl" | "xl";
	children?: any;
	id?: string;
	className?: string;
}) => {
	return (
		<div
			id={id}
			className={`${className.includes("px") ? "" : "px-4 lg:px-8 sm:px-6"} ${
				className.includes("py") ? "" : "py-12 lg:py-16 "
			} mx-auto max-w-${size} ${className}`}>
			{children}
		</div>
	);
};

export default PrimaryContainer;
