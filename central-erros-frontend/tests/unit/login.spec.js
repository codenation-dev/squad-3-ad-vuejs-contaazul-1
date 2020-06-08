import { shallowMount } from '@vue/test-utils';
import Login from '@/views/Login.vue';

const factory = data =>
  shallowMount(Login, {
    data: () => ({ ...data }),
  });

describe('Login.vue', () => {
  it('Deve ser uma instância do Vue', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('Deve definir o primeiro elemento input com valor do username', () => {
    const user = { username: 'nome_usuario' };
    const wrapper = factory({ user });

    const inputs = wrapper.findAll('input');
    const username = inputs.at(0);
    expect(username.element.value).toEqual('nome_usuario');
  });

  it('Deve definir o segundo elemento input com valor do password', () => {
    const user = { password: 'senha_usuario' };
    const wrapper = factory({ user });

    const inputs = wrapper.findAll('input');
    const password = inputs.at(1);
    expect(password.element.value).toEqual('senha_usuario');
  });

  it('Deve ser chamada a função onSubmit quando o botão de login for clicado', () => {
    const wrapper = factory();
    wrapper.vm.onSubmit = jest.fn();
    wrapper.find('button').trigger('click');
    expect(wrapper.vm.onSubmit).toBeCalled();
  });

  it('Deve ser chamada a função onSubmit quando o botão enter for pressionado', () => {
    const wrapper = factory();
    wrapper.vm.onSubmit = jest.fn();
    const inputs = wrapper.findAll('input');
    inputs.at(1).trigger('keyup.enter');
    expect(wrapper.vm.onSubmit).toBeCalled();
  });

  it('Deve exibir a senha quando botão exibir senha for clicado', () => {
    const wrapper = factory({ showPassword: false });
    const icon = wrapper.find('.icon-eye');
    icon.trigger('click');
    expect(wrapper.vm.showPassword).toBeTruthy();
  });
});
