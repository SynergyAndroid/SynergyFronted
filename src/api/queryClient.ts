import {QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            retry:false,
        },
        mutations: {
            retry: false,

        },
    },

});

export default queryClient;

//쿼리는 요청이 실패하면 기본적으로 세번 재요청을 하게 된다.
// 만약 그렇게 하고싶지 않으면 따로 설정해주면 됨 