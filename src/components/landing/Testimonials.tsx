import PrimaryContainer from "../layout/PrimaryContainer";

export default function Testimonials() {
	return (
		<div className="pt-5 pb-16 my-10 bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 lg:py-0 lg:z-10 lg:relative">
			<PrimaryContainer className="py-0 lg:py-0 md:py-0">
				<div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
					<div className="relative lg:-my-8">
						<div
							aria-hidden="true"
							className="absolute inset-x-0 top-0 h-1/2 bg-white lg:hidden"
						/>
						<div className="px-4 mx-auto max-w-md lg:max-w-3xl sm:px-6 lg:p-0 lg:h-full">
							<div className="hidden overflow-hidden rounded-xl shadow-xl lg:block aspect-w-10 aspect-h-6 sm:aspect-w-16 sm:aspect-h-7 lg:h-full">
								<img
									className="object-cover lg:h-full lg:w-full"
									src={"/static/servers.webp"}
									width={528}
									height={362}
									alt=""
								/>
							</div>
						</div>
					</div>
					<div className="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
						<div className="px-4 mx-auto max-w-md sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none">
							<blockquote>
								<div>
									<svg
										className="w-12 h-12 text-white opacity-25"
										fill="currentColor"
										viewBox="0 0 32 32"
										aria-hidden="true">
										<path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
									</svg>
									<p className="mt-6 text-2xl font-medium text-white font-inter">
										CPlusPatch is one of the most skilled
										and knowledgeable developers I have ever
										worked with. He is able to take on any
										task and complete it with ease. He
										always maintains a positive attitude and
										a sense of humor, which makes him a joy
										to work with.
									</p>
								</div>
								<footer className="mt-6">
									<p className="text-base font-medium text-white font-poppins">
										Zemi
									</p>
									<p className="text-base font-medium text-indigo-100 font-poppins">
										Computer science student
									</p>
								</footer>
							</blockquote>
						</div>
					</div>
				</div>
			</PrimaryContainer>
		</div>
	);
}
