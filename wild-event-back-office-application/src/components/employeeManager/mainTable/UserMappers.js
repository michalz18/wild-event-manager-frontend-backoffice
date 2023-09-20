export const mapRoleIdsToNames = (roleIds, allRoles) => {
    return roleIds.map(id => {
        const role = allRoles.find(role => role.id === id);
        return role ? role.name : null;
    }).filter(Boolean);
};

export const mapLocationIdsToTitles = (locationIds, allLocations) => {
    return locationIds.map(id => {
        const location = allLocations.find(loc => loc.id === id);
        return location ? location.title : null;
    }).filter(Boolean);
};