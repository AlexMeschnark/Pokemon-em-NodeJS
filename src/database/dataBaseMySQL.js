const { dataBaseConnection } = require('./connection')


const pokemons = []

async function salvarPokemons(pokemon)
{
  const insertPokemon = {
      nome_pokemon: pokemon.nome,
      tipo: pokemon.tipo,
      local_origem: pokemon.origem
  }

  const result = await dataBaseConnection('pokemons').insert(insertPokemon)

  if(result)
  {
      return{
          ...pokemon,
          id: result[0]
      }
  }
   else
   {
      console.error("Deu erro!")
      return { error: "Deu erro na inserção."}
   }
}
async function mostrarPokemon(id)
{
    const result = await dataBaseConnection('pokemons').where({ id })
    
    return result[0]
}



async function mostrarPokemons()
{
    const result = await dataBaseConnection('pokemons')


    return result
}

async function atualizarPokemon(id, pokemon)
{
    const updtatePokemon  = {
        nome_pokemon: pokemon.nome,
        tipo: pokemon.tipo,
        local_origem: pokemon.origem
    }

    const result = await dataBaseConnection('pokemons').where({ id }).update(updtatePokemon)

    if(result)
  {
      return{
          ...pokemon,
          id
      }
  }
   else
   {
      console.error("Deu erro!")
      return { error: "Deu erro na inserção."}
   }
    
}

async function deletarPokemon(id) 
{
    const result = await dataBaseConnection('pokemons').where({ id }).del()
    
    return result[0]
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
