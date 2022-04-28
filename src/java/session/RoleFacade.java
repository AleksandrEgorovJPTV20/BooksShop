/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Role;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author pupil
 */
@Stateless
public class RoleFacade extends AbstractFacade<Role> {

    @PersistenceContext(unitName = "JPTV20BooksShopPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public RoleFacade() {
        super(Role.class);
    }
    public Role findByRoleName(String roleName) {
        try {
            return (Role) em.createQuery("SELECT role FROM Role role WHERE role.roleName=:roleName")
                    .setParameter("roleName", roleName)
                    .getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }
    
    public Role getRoleByName(String roleName) {
        try {
            Role role = (Role) em.createQuery("SELECT r FROM Role r WHERE r.roleName = :roleName")
                    .setParameter("roleName", roleName)
                    .getSingleResult();
            return role;
        } catch (Exception e) {
            return null;
        }
    }    
}
