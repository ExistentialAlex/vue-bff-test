import { ref } from 'vue';
import type { UserSchema } from 'vue-nestjs-test-schemas';

export const useUserSession = () => {
  const loggedIn = ref(true); // Only true until we implement actual authentication
  const user = ref<UserSchema | null>({ id: 1, name: 'John Doe', jobTitle: 'Developer' }); // Example user data, replace with null initially

  const login = (userData: UserSchema) => {
    loggedIn.value = true;
    user.value = userData;
  };

  const logout = () => {
    loggedIn.value = false;
    user.value = null;
  };

  return { loggedIn, user, login, logout };
};
