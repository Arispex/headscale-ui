import {create} from "zustand";
import {useHeadscaleUrlStore} from "./useHeadscaleUrlStore.jsx";
import {useHeadscaleApiKeyStore} from "./useHeadscaleApiKeyStore.jsx";

export const useMachineStore = create(
    (set, get) => {
        const headscaleUrl = useHeadscaleUrlStore.getState().headscaleUrl;
        const headscaleApiKey = useHeadscaleApiKeyStore.getState().headscaleApiKey;

        return (
            {
                machines: [],
                setMachines: (machines) => set({machines: machines}),
                fetchMachines: async (onSuccess, onFailure, onError) => {
                    try {
                        const response = await fetch(headscaleUrl + "/api/v1/machine", {
                                method: "GET",
                                headers: {
                                    Accept: "application/json",
                                    Authorization: "Bearer " + headscaleApiKey,
                                }
                            }
                        )
                        if (response.ok) {
                            const data = await response.json();
                            set({machines: data.machines});
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
                filteredMachines: () => {
                    const allMachines = get().machines || [];
                    return get().filter === "" ? allMachines : allMachines.filter((machine) => machine.name.toLowerCase().includes(get().filter.toLowerCase()));
                },
                addMachine: async (user, key, onSuccess, onFailure, onError) => {
                    try {
                        const response = await fetch(headscaleUrl + "/api/v1/machine/register?user=" + user + "&key=" + key, {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    Authorization: "Bearer " + headscaleApiKey,
                                }
                            }
                        )
                        if (response.ok) {
                            const data = await response.json();
                            set({machines: data.machines});
                            if (onSuccess) onSuccess(response);
                        } else {
                            if (onFailure) onFailure(response);
                        }
                    } catch (error) {
                        if (onError) onError(error);
                    }
                },
                deleteMachine: async (machineId, onSuccess, onFailure, onError) => {
                    try {
                        const response = await fetch(headscaleUrl + "/api/v1/machine/" + machineId, {
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
            }
        )
    }
)