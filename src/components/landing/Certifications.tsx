import Tilt from "react-parallax-tilt";
import PrimaryContainer from "../layout/PrimaryContainer";

export default function Certifications() {
	return (
		<PrimaryContainer>
			<div className="relative">
				<h2 className="text-3xl font-extrabold tracking-tight leading-8 text-center text-gray-900 font-poppins sm:text-4xl">
					Certifications
				</h2>
				<p className="mx-auto mt-4 max-w-3xl text-xl text-center text-gray-500 font-inter">
					List of official certifications / experience
				</p>
			</div>

			<div className="relative flex-row mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
				<div className="relative">
					<h3 className="text-2xl font-extrabold tracking-tight text-gray-900 font-poppins sm:text-3xl">
						Astro Pi 2016-17
					</h3>
					<p className="mt-3 text-lg text-gray-500 font-inter">
						Winner of the 2016-2017 international Astro Pi challenge
						organized by the European Space Agency. The code written
						for this challenge was executed aboard the International
						Space Station.
					</p>
				</div>

				<div
					className="hidden relative -mx-4 mt-10 ml-auto lg:mt-0 lg:flex"
					aria-hidden="true">
					{/* @ts-ignore */}
					<Tilt tiltMaxAngleX={2} tiltMaxAngleY={2}>
						<img
							width={500}
							height={500}
							className="relative w-96 h-96 rounded-lg shadow-md"
							src={"/static/astropi.jpg"}
							loading="lazy"
							alt="Photograph of an Astro Pi"
						/>
					</Tilt>
				</div>
			</div>

			<div className="relative mt-12 lg:mt-12 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
				<div
					className="hidden relative -mx-4 mt-10 mr-auto lg:mt-0 lg:flex"
					aria-hidden="true">
					{/* @ts-ignore */}
					<Tilt tiltMaxAngleX={2} tiltMaxAngleY={2}>
						<img
							width={500}
							height={500}
							className="relative w-96 h-96 rounded-lg shadow-md"
							src={"/static/spaceshuttle.jpg"}
							loading="lazy"
							alt="Photograph of a space shuttle"
						/>
					</Tilt>
				</div>

				<div className="flex relative flex-col gap-y-3">
					<h3 className="text-2xl font-extrabold tracking-tight text-gray-900 font-poppins sm:text-3xl">
						GAREF Aerospace Member
					</h3>
					<p className="text-lg text-gray-500 font-inter">
						Member of the GAREF Aerospace Agency for 2 years,
						official CNES partners and creators of the Horus/SERA
						missions.
					</p>
					<p className="text-lg text-gray-500 font-inter">
						GAREF Aerospace is an scientific club specifically
						intended for students to learn about the aerospace
						industry in the hands of field professionals.
					</p>
					<a
						className="text-lg text-blue-400 font-inter"
						href="https://garef.com"
						target="_blank"
						rel="noreferrer">
						Visit GAREF
					</a>
				</div>
			</div>
		</PrimaryContainer>
	);
}