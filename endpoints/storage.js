export function uploadFile({ file, folder, name }) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject({ error: 'Select a valid image', data: null })
    }

    if (!validateTypeFile(file)) {
      reject({ error: 'File type not allowed (only images)', data: null })
    }

    if (!validateSizeFile(file)) {
      reject({ error: 'File exceeds allowed size', data: null })
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

  const [, type] = file.name.split('.')
  const typesAllowed = ['png', 'jpg', 'jpeg']
  return typesAllowed.includes(type?.toLowerCase())
}

export function validateSizeFile(file) {
  const maxSizeInBytes = 500000 // 500Kb
  return file.size <= maxSizeInBytes
}

export function getFileUrl(folder, fileName){
  console.log('🚀 ~ file: storage.js ~ line 43 ~ getFileUrl ~ folder, fileName', folder, fileName)
  return new Promise((resolve) => {
    const storageRef = $nuxt.$fire.storage.ref().child(`${folder}/${fileName}`)

    storageRef.getDownloadURL()
      .then((url) => resolve(url))
      .catch(() => resolve(''))  
  })
}