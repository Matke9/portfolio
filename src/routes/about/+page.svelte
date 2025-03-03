<script>
	import ProgressBar from '$lib/ProgressBar.svelte';
</script>

<div class="white-text-glow flex flex-col flex-wrap content-center justify-center p-20">
	<img
		src="AboutMe.webp"
		alt="About me"
		class="w-[30vw] transform self-center pb-6 duration-200 ease-in-out hover:scale-105"
	/>
	<div class="about flex flex-col content-center justify-center">
		<h2>👋 Introduction</h2>
		<p>
			Hi, I'm Mihailo Matovic, a passionate and versatile developer with a love for problem-solving
			and creating engaging digital experiences. I enjoy game development and web development,
			always looking for creative ways to bring ideas to life. My development journey started at a
			young age, and over time, I’ve built a diverse technical skill set that allows me to tackle a
			variety of challenges.
		</p>
		<h2>🛠️ Skills & Technologies</h2>
		<p>Programming Languages</p>
		<ul>
			<li>C#</li>
			<ProgressBar percentage={80} />
			<li>C, C++</li>
			<ProgressBar percentage={60} />
			<li>Java</li>
			<ProgressBar percentage={60} />
			<li>Python</li>
			<ProgressBar percentage={30} />
			<li>HTML, CSS, JavaScript</li>
			<ProgressBar percentage={80} />
		</ul>
		<h2>🚀 What Drives Me</h2>
		<p>
			✅ I love logic-heavy challenges and problem-solving<br />✅ ️️️️️ Collaboration keeps me
			motivated, but I’m also comfortable working solo<br />✅ Always looking to learn and expand my
			knowledge across different fields
		</p>
		<h2>🎮 Outside of Tech</h2>
		<p>When I’m not coding, I enjoy:</p>
		<ul>
			<li>Playing board games & video games with friends</li>
			<li>Playing guitar</li>
			<li>Occasionally playing ice hockey</li>
			<li>Living by the mindset: "A little better every day."</li>
		</ul>
	</div>
</div>

<style>
	.about h2 {
		font-size: calc(20px + 1.25vw);
		padding: 20px 0;
	}
	.about p {
		font-size: calc(15px + 0.5vw);
		padding-left: 20px;
	}
	.about li {
		font-size: calc(15px + 0.5vw);
	}
	.about ul {
		padding-left: 60px;
		list-style: disc;
	}
</style>
