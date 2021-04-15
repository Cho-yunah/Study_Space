import { useReducer, useEffect } from "react";

// reducer function 구현
function reducer (state, action) {
  switch(action.type) {
    case "LOADING" :
      return {loading: true, data: null, error: null};
    case "SUCCESS" : 
    return {loading: false, data: action.data, error: null}
    case "ERROR" : 
    return { loading : false, data: null, error: action.error}
    default : throw new Error (`Unhandled action type : ${action.error}`)
  }
}

function useAsync (callback, deps = [], skip = false) {  
  // 첫번째 파라미터는 API 요청을 시작하는 함수, 두번째는 deps(useEffect의 deps로 설정됨)
  const [state, dispatch] = useReducer (reducer, {
    loading: false, data: null, error: false
  });

  const fetchData = async() => {
    dispatch ({type: 'LOADING'});
    try {
      const data = await callback(); // promise가 data에 담긴다
      dispatch({type: "SUCCESS", data});
    } catch(e) {
      dispatch ({type: "ERROR", error: e});
  }
}
useEffect(()=> {
  if(skip) return;
  fetchData();
  // eslint-disable-next-line
}, deps);

return [state, fetchData];
}

export default useAsync;