import supabase, { supabaseUrl } from "../supabase"
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

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl)
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', "")
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
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

  let query = supabase.from('cabins')
  // Create cabin
  if (!id)
    query = query
      .insert([{ ...transformedCabin, image: imagePath }])

  // Edit cabin
  if (id)
    query = query
      .update({ ...transformedCabin, image: imagePath }).eq("id", id)

  const { data, error } = await query.select().single()

  if (error) {
    console.error(error)
    throw new Error("Cabin could not be created")
  }

  // Upload image
  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  // Delete cabin if there's uploading error
  if (storageError) {
    await supabase
      .from('cabins')
      .delete()
      .eq('id', data.id)

    console.error(error)
    throw new Error("Cabin image could not be uploaded and cabin was not be created")
  }

  return data
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