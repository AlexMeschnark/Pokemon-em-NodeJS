const sequence = {
    _id: 1,
    get id() { return this._id++}
}

const pokemons = []

function salvarPokemons(pokemon)
{
    if(!pokemon.id) pokemon.id = sequence.id
    pokemons[pokemon.id] = pokemon
   
    return pokemon
}

function mostrarPokemon(id)
{
    return pokemons[id] || {}
}

function mostrarPokemons()
{
    return Object.values(pokemons)
}

function atualizarPokemon(id, pokemon)
{
    pokemons[id] = pokemon
    return pokemon
}

function deletarPokemon(id) 
{
    sequence._id = sequence._id -1
    const pokemonDeletado = pokemons[id]
   
    pokemons.splice(id, 1)

    pokemons.forEach(pokemon => {
        if (pokemon.id > id)
        {
            pokemon.id = pokemon.id - 1
        }
    })
    return pokemonDeletado
}

function batalhaPokemon(id1, id2)
{
    const superEfetivo = 40
    const efetivo = 20
    const naoEfetivo = 10

    const pokemon1 = pokemons[id1]
    const pokemon2 = pokemons[id2]

    //Verifica o hp dos combatentes.
    if(pokemon1.hp != 0 && pokemon2.hp !=0)
    {

        //Pokemon2 perdendo vida.
        if(pokemon1.tipo == pokemon2.fraqueza)
        {
            pokemon2.hp = pokemon2.hp - superEfetivo
        }
        else if(pokemon1.tipo == pokemon2.resistencia)
        {
            pokemon2.hp = pokemon2.hp - naoEfetivo
        }
        else
        {
             pokemon2.hp = pokemon2.hp - efetivo  
        }

        //Pokemon1 perdendo vida.
        if(pokemon2.tipo == pokemon1.fraqueza)
        {
            pokemon1.hp = pokemon1.hp -superEfetivo
        }
        else if(pokemon2.tipo == pokemon1.resistencia)
        {
            pokemon1.hp = pokemon1.hp - naoEfetivo
        }
        else
        {
             pokemon1.hp = pokemon1.hp - efetivo  
        }
    } 

    //Não deixando o pokemon ficar com vida negativa.
    if(pokemon1.hp < 0) pokemon1.hp = 0
    if(pokemon2.hp < 0) pokemon2.hp = 0
    
   return `${pokemon1.nome}: ${pokemon1.hp} / ${pokemon2.nome}: ${pokemon2.hp}`
}

function pocao (id)
{
    const pokemonLow = pokemons[id]
    const hp = pokemonLow.hp
    var hpdif

    if (pokemonLow.hp <100)
    {
        pokemonLow.hp = pokemonLow.hp + 20
        
        //Recupera hp até o limite de 100.
        if (pokemonLow.hp > 100)
        {
            pokemonLow.hp = 100
        }
       
        //Quantidade de hp que recuperou.
        hpdif = pokemonLow.hp - hp

        if (pokemonLow.hp == 100)
        {
           return `${pokemonLow.nome} recuperou ${hpdif} de vida e agora está com a vida cheia! HP: ${pokemonLow.hp}`
        }
        
        return `${pokemonLow.nome} recuperou ${hpdif} de vida. HP: ${pokemonLow.hp}`
    }
    else
    {
        return `${pokemonLow.nome} já está com a vida cheia.`
    }
   
}

//Exportando função
module.exports = {  salvarPokemons, mostrarPokemon, mostrarPokemons, atualizarPokemon, deletarPokemon, batalhaPokemon, pocao }
