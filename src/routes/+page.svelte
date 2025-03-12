<div
	class="font-title flex h-full flex-col items-center justify-center pb-24 pl-0 pt-10 font-black md:flex-row md:flex-wrap md:pl-10"
>
	<!-- Image Container -->
	<div
		class="img box-glow bg-ja z-10 mb-10 h-80 w-60 transform rounded-lg border-4 border-[var(--accent-light)] bg-cover bg-center bg-no-repeat duration-200 ease-in-out hover:scale-110 md:mb-0 md:mr-10"
	></div>

	<!-- Text Container -->
	<div
		class="md: flex max-w-[70%] flex-col items-center justify-center text-center md:items-start md:text-left"
	>
		<div class="w-fit transform text-3xl duration-200 ease-in-out hover:scale-105">
			HI, MY NAME IS
		</div>
		<div
			class="div transform text-6xl text-[var(--accent-light)] duration-200 ease-in-out hover:scale-105"
		>
			MIHAILO MATOVIC
		</div>
		<div
			class="flex w-full max-w-[500px] max-w-[90%] transform flex-wrap text-4xl duration-200 ease-in-out hover:scale-105"
		>
			A GAME AND WEB DEVELOPER FROM SERBIA
		</div>
	</div>
</div>

<style>
	.div {
		text-shadow: var(--accent-light) 0px 0px 19px;
	}
	.bg-ja {
		background-image: url('/Ja.webp');
	}

	@media (max-width: 768px) {
		.img {
			margin-bottom: 20px; /* Adjust spacing for smaller screens */
		}
		.text-6xl {
			font-size: 4rem; /* Adjust font size for smaller screens */
		}
		.text-4xl {
			font-size: 2rem; /* Adjust font size for smaller screens */
		}
	}
</style>
