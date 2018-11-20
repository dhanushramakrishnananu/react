export const formEventOptimizer = (event, onChangeCallback) => {
    event.preventDefault();
    let { name, value } = event.target;
    onChangeCallback({ name, value, event });
};
