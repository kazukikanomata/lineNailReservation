package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kazukikanomata/backend/database"
	"github.com/kazukikanomata/backend/internal/jwtauth"
)

type AuthHandler struct {
	repo     *database.Repository
	secret   []byte
	issuer   string
	audience string
	tokenTTL time.Duration
}

func NewAuthHandler(repo *database.Repository, secret []byte, issuer, audience string, tokenTTL time.Duration) *AuthHandler {
	return &AuthHandler{
		repo:     repo,
		secret:   secret,
		issuer:   issuer,
		audience: audience,
		tokenTTL: tokenTTL,
	}
}

type loginJSON struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (h *AuthHandler) Login(c *gin.Context) {
	var body loginJSON
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid_request"})
		return
	}

	admin, err := h.repo.FindAdminByEmail(body.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "login_failed"})
		return
	}
	if admin == nil || !database.CheckAdminPassword(admin, body.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid_credentials"})
		return
	}

	tokenStr, err := jwtauth.MintAccessToken(h.secret, h.issuer, h.audience, h.tokenTTL, admin.Id, admin.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "login_failed"})
		return
	}

	sec := int64(h.tokenTTL / time.Second)
	c.JSON(http.StatusOK, gin.H{
		"access_token": tokenStr,
		"token_type":   "Bearer",
		"expires_in":   sec,
		"email":        admin.Email,
		"admin_id":     admin.Id,
	})
}

func (h *AuthHandler) Me(c *gin.Context) {
	sub, _ := c.Get(jwtauth.ContextAdminSubjectKey)
	email, _ := c.Get(jwtauth.ContextAdminEmailKey)
	c.JSON(http.StatusOK, gin.H{
		"sub":   sub,
		"email": email,
	})
}
