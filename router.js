class Router{
    constructor(routes){
        this.routes = routes;
        this._loadInitialRoute();
    }
    loadRoute(...urlSegs){
        const matchedRoute = this._matchUrlToRoute(urlSegs);
        const url = `/${urlSegs.join('/')}`;
        history.pushState({}, 'this works', url);
        const routerOutElm = document.querySelectorAll('[data-router]')[0];
        routerOutElm.innerHTML = matchedRoute.template;
    }
    _loadInitialRoute(){
        const pathNamesSplit = window.location.pathname.split('/');
        const pathSegs = pathNamesSplit.length > 1 ? pathNamesSplit.slice(1):'';
        console.log(pathNamesSplit);
        this.loadRoute(...pathSegs)
    }
    _matchUrlToRoute(urlSegs){
        const matchedRoute = this.routes.find(route => {
            const routePathSegs = route.path.split('/').slice(1)
            if (routePathSegs.length !== urlSegs.length){
                return false;
            }
            return routePathSegs
                .every((routePathSegs, i) => routePathSegs === urlSegs[i]);
        });
        return matchedRoute;
    }
    
}