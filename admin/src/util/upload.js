import axios from 'axios';

function upload(path, userForm) {
  //有文件，不能直接提交
  const params = new FormData()
  for (let i in userForm) {
    params.append(i, userForm[i])
  }
  return axios.post(path, params, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then(res => {
    //console.log(res.data)
    return res.data
  })
}

export default upload