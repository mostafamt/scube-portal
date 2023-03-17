import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
  pageTitle: "",
  pageLang: "en",
  selectedIndex: 0,
  isLoggedIn: false,
  error: "",
  users: [],
  groups: [],
  courses: [],
  tenants: [],
  setPageTitle: (title) => {
    set((state) => ({
      pageTitle: title,
    }));
  },
  setPageLang: (lang) => {
    set((state) => ({
      pageLang: lang,
    }));
  },
  setSelectedIndex: (index) => {
    set((state) => ({
      selectedIndex: index,
    }));
  },
  login: () => {
    set((state) => ({
      isLoggedIn: true,
      error: "",
    }));
  },
  logout: () => {
    set((state) => ({
      isLoggedIn: false,
      users: [],
      groups: [],
      tenants: [],
      error: "",
    }));
  },
  setError: (err) => {
    set((state) => ({
      error: err,
    }));
  },
  addTenant: (tenant) => {
    set((state) => ({
      tenants: [tenant, ...state.tenants],
    }));
  },
  removeTenant: (id) => {
    set((state) => ({
      tenants: state.tenants.filter((t) => t._id !== id),
    }));
  },
  setTenants: (tenants) => {
    set((state) => ({ tenants: tenants }));
  },
  addUser: (user) => {
    set((state) => ({
      users: [user, ...state.users],
    }));
  },
  removeUser: (username) => {
    set((state) => ({
      users: state.users.filter((u) => u.username !== username),
    }));
  },
  setUsers: (users) => {
    set((state) => ({ users: users }));
  },
  addGroup: (group) => {
    set((state) => ({
      groups: [group, ...state.groups],
    }));
  },
  removeGroup: (name) => {
    set((state) => ({
      groups: state.groups.filter((g) => g.GroupName !== name),
    }));
  },
  setGroups: (groups) => {
    set((state) => ({ groups: groups }));
  },
  addCourse: (course) => {
    set((state) => ({
      courses: [course, ...state.courses],
    }));
  },
  removeCourse: (id) => {
    set((state) => ({
      courses: state.courses.filter((c) => c._id !== id),
    }));
  },
  setCourses: (courses) => {
    set((state) => ({ courses: courses }));
  },
});

const useStore = create(devtools(persist(store, { name: "store" })));
export default useStore;
