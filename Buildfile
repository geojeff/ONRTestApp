# ===========================================================================
# Project:   ONRTestApp
# ===========================================================================

config :ONR, :required => [:sproutcore]
config :onr_test_app, :required => [:sproutcore, "sproutcore/forms", "sproutcore/animation", "sproutcore/statechart", :ONR]

