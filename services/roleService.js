import axios from "../customize/axios";

const createRoles = (roles)=>{
    return axios.post('/api/v1/role/create ', [...roles])
}

const fetchAllRole = ()=>{
    return axios.get(`/api/v1/role/read`)
}

const deleteRole = (role)=>{
    return axios.delete(`/api/v1/role/delete`, {data: {id: role.id}})
}

const fetchRolesByGroup = (groupId) =>{
    return axios.get(`/api/v1/role/by-group/${groupId}`)
}

const assignRolesToGroup = (data)=>{
    try {
        return axios.post('/api/v1/role/assign-to-group', {data})
    } catch (error) {
        console.log('error while call api: ', error)
    }
}

export {createRoles, fetchAllRole, deleteRole, fetchRolesByGroup, assignRolesToGroup}