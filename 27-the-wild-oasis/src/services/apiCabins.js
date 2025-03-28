import supabase from "../supabase"
import { camelToSnake } from "../utils/helpers"

export async function getCabins() {

  const { data, error } = await supabase
    .from('cabins')
    .select('*')

  if (error) {
    console.error(error)
    throw new Error('Cabins could not be loaded')
  }

  return data
}

export async function createCabin(newCabin) {
  // Only convert keys that have more than one word (camelCase)
  const transformedCabin = Object.keys(newCabin).reduce((acc, key) => {
    if (/[A-Z]/.test(key)) {
      // If the key contains a capital letter, it's camelCase, so we convert it
      acc[camelToSnake(key)] = newCabin[key];
    } else {
      // Otherwise, keep the key as it is
      acc[key] = newCabin[key];
    }
    return acc;
  }, {});

  const { error } = await supabase
    .from('cabins')
    .insert([transformedCabin])


  if (error) {
    console.error(error)
    throw new Error("Cabin could not be created")
  }
}

export async function deleteCabin(id) {

  const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

  if (error) {
    console.error(error)
    throw new Error("Cabin could not be deleted")
  }
}