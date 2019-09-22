import React from "react";
// import pokemonList from "./pokemon/pokemon.js";
// import logo from "./pokemon_logo.png";
import "./App.css";

const getPokemonData = list => {
	return list.map(data => {
		return {
			id: data.id,
			name: data.name.english,
			type: data.type,
			hp: data.base.HP,
			attack: data.base.Attack,
			defence: data.base.Defence,
			spAttack: data.base.SpAttack,
			spDefence: data.base.SpDefence,
			speed: data.base.Speed
		};
	});
};

const Pokemon = ({
	id,
	name,
	type,
	hp,
	attack,
	defence,
	spAttack,
	spDefence,
	speed
}) => {
	const imgPath = require(`./pokemon/${id}.png`);

	return (
		<div className={"theCard"}>
			<img src={imgPath} alt={name} />
			<h2>{name}</h2>
			<div className={"typeBox"}>
				{type.map((oneType, i) => (
					<p key={i} className={`type ${oneType}`}>
						{oneType}
					</p>
				))}
			</div>
			<p className={"hp"}>HP: {hp}</p>
			<p className={"attack"}>Attack: {attack}</p>
			<p className={"defence"}>Defence: {defence}</p>
			<p className={"spAttack"}>SpAttack: {spAttack}</p>
			<p className={"spDefence"}>SpDefence: {spDefence}</p>
			<p className={"speed"}>Speed: {speed}</p>
		</div>
	);
};

const PokemonCards = props => {
	return props.lists.map(char => {
		return (
			<Pokemon
				key={char.id}
				id={char.id}
				name={char.name}
				type={char.type}
				hp={char.hp}
				attack={char.attack}
				defence={char.defence}
				spAttack={char.spAttack}
				spDefence={char.spDefence}
				speed={char.speed}
			/>
		);
	});
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pokemonData: []
		};
	}
	componentDidMount() {
		fetch(
			"https://us-central1-pokedex-23fb6.cloudfunctions.net/app/pokemonData"
		)
			.then(res => res.json())
			.then(data =>
				this.setState(state => {
					return { pokemonData: data };
				})
			);
	}
	render() {
		const flattenPokemonList = getPokemonData(this.state.pokemonData);
		// use getPokemonData to get a flatten array of pokemon => flattenPokemonList
		// getFirstPokemon using [0] => firstPokemon
		return (
			<div className="App">
				<img
					className={"logo"}
					src={require("./pokemon_logo.png")}
					alt="logo"
				/>
				<PokemonCards lists={flattenPokemonList} />
			</div>
		);
	}
}

export default App;
