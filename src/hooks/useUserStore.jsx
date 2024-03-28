import {create} from "zustand";
import {useHeadscaleUrlStore} from "./useHeadscaleUrlStore.jsx";
import {useHeadscaleApiKeyStore} from "./useHeadscaleApiKeyStore.jsx";

export const useUserStore = create(
    (set, get) => {
        const headscaleUrl = useHeadscaleUrlStore.getState().headscaleUrl;
        const headscaleApiKey = useHeadscaleApiKeyStore.getState().headscaleApiKey;

        return (
            {
                users: [],
                setUsers: (users) => set({users: users}),
                fetchUsers: async (onSuccess, onFailure, onError) => {
                    try {
                        const response = await fetch(headscaleUrl + "/api/v1/user", {
                                method: "GET",
                                headers: {
                                    Accept: "application/json",
                                    Authorization: "Bearer " + headscaleApiKey,
                                }
                            }
                        )
                        if (response.ok) {
                            const data = await response.json();
                            set({users: data.users});
                            if (onSuccess) onSuccess(response);
                        } else {
                            if (onFailure) onFailure(response);
                        }
                    } catch (error) {
                        if (onError) onError(error);
                    }
                },
                filter: "",
                setFilter: (filter) => set({filter: filter}),
                filteredUsers: () => {
                    return get().filter === "" ? get().users : get().users.filter((user) => user.name.toLowerCase().includes(get().filter.toLowerCase()));
                },
                addUser: async (name, onSuccess, onFailure, onError) => {
                    try {
                        const response = await fetch(headscaleUrl + "/api/v1/user", {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    Authorization: "Bearer " + headscaleApiKey,
                                },
                                body: JSON.stringify({name: name})
                            }
                        )
                        if (response.ok) {
                            if (onSuccess) onSuccess(response);
                        } else {
                            if (onFailure) onFailure(response);
                        }
                    } catch (error) {
                        if (onError) onError(error);
                    }
                },
                deleteUser: async (name, onSuccess, onFailure, onError) => {
                    try {
                        const response = await fetch(headscaleUrl + "/api/v1/user/" + name, {
                                method: "DELETE",
                                headers: {
                                    Accept: "application/json",
                                    Authorization: "Bearer " + headscaleApiKey,
                                },
                            }
                        )
                        if (response.ok) {
                            if (onSuccess) onSuccess(response);
                        } else {
                            if (onFailure) onFailure(response);
                        }
                    } catch (error) {
                        if (onError) onError(error);
                    }
                },
                renameUser: async (oldName, newName, onSuccess, onFailure, onError) => {
                    try {
                        const response = await fetch(headscaleUrl + "/api/v1/user/" + oldName + "/rename/" + newName, {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    Authorization: "Bearer " + headscaleApiKey,
                                },
                            }
                        )
                        if (response.ok) {
                            if (onSuccess) onSuccess(response);
                        } else {
                            if (onFailure) onFailure(response);
                        }
                    } catch (error) {
                        if (onError) onError(error);
                    }
                }
            }
        )
    }
)