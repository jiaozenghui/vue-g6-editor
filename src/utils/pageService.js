import axios from "axios";

let headerCof ={};
headerCof['X-Project-Id'] = parent.window.localStorage.getItem('project_id');
headerCof['X-Project-Name'] = parent.window.localStorage.getItem('project_name');
headerCof['X-User-Name'] = parent.window.localStorage.getItem('username');
headerCof['X-Tenant-Id'] = parent.window.localStorage.getItem('project_id');
headerCof['X-Tenant-Name'] = parent.window.localStorage.getItem('project_name');
headerCof['X-Auth-Token'] = parent.window.localStorage.getItem('A_auth_token');
headerCof['token'] = parent.window.localStorage.getItem('A_auth_token');
const getGraphs =()=> {
    return axios.get('/v1/topos/graphs');
}

const getGraphDetail =(id)=> {
    return axios.get(`/v1/topos/graphs/${id}`);
}

const addGraph = (params)=> {
    return axios.post('/v1/topos/graphs', params);
}

const updateGraph = (id,params)=> {
    return axios.put(`/v1/topos/graphs/${id}`, params);
}

const removeGraph = (id)=> {
    return axios.delete(`/v1/topos/graphs/${id}`);
}

const getResouceTree =()=>{

    return axios.get('/api/v1/devices/resource_groups', {
        headers: headerCof
    })
}

const getResouceList =(sub_type)=>{
    return axios.get('/api/v1/devices/resources?resource_sub_type='+sub_type, {
        headers: headerCof
    })
}

const updateNode = (id,node_id,params)=> {
    return axios.put(`/v1/topos/graphs/${id}/nodes/${node_id}`, params);
}


export default {
    getGraphs,
    addGraph,
    getGraphDetail,
    updateGraph,
    removeGraph,
    getResouceTree,
    getResouceList,
    updateNode
  };