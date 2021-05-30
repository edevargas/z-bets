export function uploadFile({ file, folder, name }) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject({ error: 'file_valid_image', data: null })
    }

    if (!validateTypeFile(file)) {
      reject({ error: 'file_type_not_allowed', data: null })
    }

    if (!validateSizeFile(file)) {
      reject({ error: 'file_exceeds_size', data: null })
    }

    const storageRef = $nuxt.$fire.storage.ref().child(`${folder}/${name}`)
    const uploadTask = storageRef.put(file)  

    uploadTask.then(() => {
      storageRef
        .getDownloadURL()
        .then((downloadURL) => resolve({ error: null, data: downloadURL }))
        .catch((error) => reject({ error, data: null }))
    })
  })
}

export function validateTypeFile(file) {
  if (!file || Object.keys(file).length) {
    return false
  }

  const type = file.name.split('.').pop()
  const typesAllowed = ['png', 'jpg', 'jpeg']
  return typesAllowed.includes(type?.toLowerCase())
}

export function validateSizeFile(file) {
  const maxSizeInBytes = 500000 // 500Kb
  return file.size <= maxSizeInBytes
}

export function getFileUrl(folder, fileName){
  if(!folder || !fileName) {
    return ''
  }
  
  return new Promise((resolve) => {
    const storageRef = $nuxt.$fire.storage.ref().child(`${folder}/${fileName}`)

    storageRef.getDownloadURL()
      .then((url) => resolve(url))
      .catch(() => resolve(''))  
  })
}