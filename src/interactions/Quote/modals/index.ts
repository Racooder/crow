import type { Modal } from "../../modals.js";
import handleAddModal from "./add/handler.js";
import handleEditModal from "./edit/handler.js";

export default {
    id: "quote",
    submodals: {
        add: {
            handler: handleAddModal,
            submodals: {},
        },
        edit: {
            handler: handleEditModal,
            submodals: {},
        }
    },
} as Modal;
