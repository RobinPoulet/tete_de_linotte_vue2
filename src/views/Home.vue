<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-mixed-spaces-and-tabs -->
<template>
  <div class="home">
		<div class="container">
			<div class="container--left">
				<div class="unsplash-credit">
					Photo by <a target="_blank" href="https://unsplash.com/@jtylernix">Tyler Nix</a> on <a target="_blank" href="https://unsplash.com">Unsplash</a>
				</div>
			</div>
			<div class="container--right">
				<h1>Tête de linotte</h1>
				<h2>Création artisanale "made in France"</h2>
				<router-link 
					to="/products"
					style="text-decoration: none; color: inherit;"
				>
					<div class="btn--white">Voir le catalogue</div>
				</router-link>
			</div>
  	</div>
		<div class="home--middle">
			<div class="list--container">
				<h2>Derniers articles</h2>
				
				<div style="text-align:center">Ici on remplacera ce bloc par un composant Liste.vue</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
}
</script>

<style scoped>
.container {
	margin: 0 auto;
	height: 100vh;
	display: flex;
}
.container .container--left {
	width: 50%;
	height: 100%;
	position: relative;
	background-size: cover;
	background-image: url(https://images.unsplash.com/photo-1520116468816-95b69f847357?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80);
	background-position: 50%;
}
.container .container--left .unsplash-credit {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	text-align: center;
	padding-bottom: 10px;
	color: white;
	z-index: 5;
}
.container .container--left .unsplash-credit a {
	color: white;
}
.container .container--left:after {
	position: absolute;
	content:"";
	height:100%;
	width:100%;
	top:0;
	left:0;
	background: linear-gradient(to right, rgba(255,0,0,0) 50%,rgba(85, 230, 193,1.0) 100%);
}
.container .container--right {
	background-color: rgba(85, 230, 193,1.0);
	flex: 1;
	display: flex;
	align-items: flex-start;
	color: white;
	padding: 0 50px;
	justify-content: center;
	flex-direction: column;
}
.container .container--right h1 {
	font-size: 3rem;
	text-transform: uppercase;
	font-weight: 500;
}
.container .container--right h2 {
	font-size: 2.5rem;
	font-weight: 300;
	margin: 30px 0;
}
.container .container--right .btn--white {
	border: 1px solid white;
	border-radius: 5px;
	padding: 12px;
	text-transform: uppercase;
	cursor: pointer;
	transition: all .2s;
	background-color: white;
	color:rgba(85, 230, 193,1.0);
	font-weight: 500;
}
.container .container--right .btn--white:hover {
	transform: translateY(-2px);
}
.home--middle {
	background-color: white;
	padding: 30px 0;
}
.home--middle .list--container {
	max-width: 1200px;
	margin: auto;
}
.home--middle .list--container h2 {
	color: #35495e;
	text-align: center;
	font-size: 2.4rem;
	font-weight: 500;
	margin-bottom: 20px;
}
</style>
